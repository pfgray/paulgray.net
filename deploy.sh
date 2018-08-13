#!/usr/bin/env bash


# make a new bucket paulgraynet-temp
aws s3 rm s3://$1 --recursive --profile $2

# upload everything in public/
aws s3 --profile $2 cp ./public/ s3://$1 --recursive


# point cloudfront to our bucket

