FROM python:3.8-buster
COPY . /app
WORKDIR /app
RUN mkdir creds
ENV GOOGLE_APPLICATION_CREDENTIALS="/app/creds/la-fabrica-bucket.json"
RUN pip install -r requirements.txt
CMD python main.py