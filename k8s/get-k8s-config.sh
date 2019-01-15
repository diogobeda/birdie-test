#!/bin/bash

curl --verbose -H "Content-Type: application/json" -H "Authorization: Bearer "$DIGITALOCEAN_API_TOKEN"" https://api.digitalocean.com/v2/kubernetes/clusters/"$DIGITALOCEAN_KUBE_CLUSTER_ID"/kubeconfig > do-kubeconfig.yaml