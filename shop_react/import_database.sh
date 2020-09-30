#!/bin/bash

mongoimport -d shopDB -c shops --type csv --file ./public/data/catalog.csv --headerline