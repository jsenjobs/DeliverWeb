docker run -d -p 8888:80 --name dilverwaterweb jsenht/dilverwaterweb:1.1.3

docker build -t jsenht/dilverwaterweb:1.1.3 .

docker push jsenht/dilverwaterweb:1.1.3
