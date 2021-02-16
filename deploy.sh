#!/usr/bin/env sh

sudo git add .

echo message

read varname
sudo git commit -m "$varname"
sudo git push --all

ng deploy --base-href=/weather/

