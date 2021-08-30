#!/bin/bash
cd /home/ubuntu/pick-me-up/server

export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start index.js
