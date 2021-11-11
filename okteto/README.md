# How to start this Docker container

To run: docker build -t user/repo:latest . && docker run -it user/repo:latest

Or, get a Kubernetes cluster, create the deployment with `kubectl apply -f k8s.yml`
(it is running now, with a Service to the local cluster, you could port-forward it)

Instead, use `okteto up` to reconnect to it locally.

Then visit: [localhost:8080](http://localhost:8080/)

To clean up after, you can run `okteto down -v` and `kubectl delete -f k8s.yaml`

Example infrastructure provided by [okteto/supervisor-nginx](https://github.com/okteto/supervisor-nginx)

On Okteto Cloud, you can run `okteto up --build` otherwise, just replace the image in `k8s.yml` and in
`okteto.yml` with your own image, wherever you publish it:

```yaml
image:
  name: okteto.dev/supervisord-nginx:latest
```
and

```yaml
spec:
  containers:
  - image: okteto.dev/supervisord-nginx:latest
```

For further reference, see [Okteto Manifest reference docs](https://okteto.com/docs/reference/manifest/)
