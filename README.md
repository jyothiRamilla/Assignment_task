## To run the code  -  node index.js

## 1. Should follow the folder structure of (controller, service, entity)
    1. “controller” is for the req, res
    2. “service” is for the business logic
    3. “repository” is for only sql or query stuffs (should not have business logic) o
    4. “entity” is for the database modeling
2. use eslint with airbnb style
3. make all the api’s docs

## You can see this structure in src folder 

## I have used Ganache local rpc for this ->  url : http://192.168.0.189:7545

Get latest 1000 transaction of etherium, return the result sorted by etherium quantity.
datas
- Transaction hash,
- sender address
- receiver address
- amount of ether transferred
- block number


## This code use swagger docs -  You can see the apis using the below url after running the code.

## http://localhost:3000/api-docs



## 2. Get the list of each coin’s average price(**Average price of 100 recent transactions)** -   This will take time to execute because there are nearly 2600 coins are there and need to find the average on the top of it for each coin.You can see the logs in  terminal



