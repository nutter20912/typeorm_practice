#!/bin/sh

# -u File containing data to PUT
# -T sets the Content-Type
# -v How much troubleshooting info to print
# -c is concurrent clients
# -n is the number of requests to run in the test

ab -u data.txt -T application/json -v 3 -c 30 -n 30 http://localhost:3000/user/1/cash/addOrFail >> result.log 2>&1
