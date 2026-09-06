const express = require("express");
const { randomUUID } = require("crypto");

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const {
    DynamoDBDocumentClient,
    PutCommand,
    GetCommand,
    ScanCommand
} = require("@aws-sdk/lib-dynamodb");


const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8080;

const TABLE_NAME = process.env.ORDERS_TABLE || "orders";


const client = new DynamoDBClient({ region: process.env.AWS_REGION || "us-east-1"
});

const dynamodb = DynamoDBDocumentClient.from(client);


app.get("/health", (req, res) => {

    res.status(200).json({
        status: "UP"
    });

});


app.post("/orders", async (req, res) => {

    try {

        const orderId = randomUUID();

        const order = {
            orderId,
            product: req.body.product,
            quantity: req.body.quantity
        };

        await dynamodb.send(
            new PutCommand({
                TableName: TABLE_NAME,
                Item: order
            })
        );

        res.status(201).json(order);
        

        console.log("WRITE SUCCESS");
        console.log("Table:", TABLE_NAME);
        console.log("Region:", process.env.AWS_REGION);
        console.log("Order:", order);

    } catch (error) {

        console.error("Error creating order:", error);

        res.status(500).json({
            error: "Unable to create order"
        });

    }

});


app.get("/orders/:id", async (req, res) => {

    try {

        const result = await dynamodb.send(
            new GetCommand({
                TableName: TABLE_NAME,
                Key: {
                    orderId: req.params.id
                },
                ConsistentRead: true

            })
        );

        if (!result.Item) {

            return res.status(404).json({
                error: "Order not found"
            });

        }

        res.status(200).json(result.Item);

    } catch (error) {

        console.error("Error retrieving order:", error);

        res.status(500).json({
            error: "Unable to retrieve order"
        });

    }

});


app.get("/orders", async (req, res) => {

    try {

        const result = await dynamodb.send(
            new ScanCommand({
                TableName: TABLE_NAME,
                ConsistentRead: true

            })
        );

        res.status(200).json(result.Items);

    } catch (error) {

        console.error("Error retrieving orders:", error);

        res.status(500).json({
            error: "Unable to retrieve orders"
        });

    }

});


app.listen(PORT, "0.0.0.0", () => {

    console.log(
        `Orders API running on port ${PORT}`
    );

});