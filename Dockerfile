FROM ubuntu

RUN apt-get update && apt-get install -y supervisor nginx
COPY okteto/nginx.conf /etc/supervisor/conf.d/nginx.conf
CMD ["supervisord", "-n"]
