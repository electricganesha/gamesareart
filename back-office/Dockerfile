FROM danlynn/ember-cli:2.16.2
RUN mkdir -p /back-office
WORKDIR /back-office
COPY package.json /back-office
COPY bower.json /back-office
RUN npm install -g bower gulp karma-cli \
    && npm install \
    && bower install --allow-root
EXPOSE 4201
COPY ./ /back-office/
CMD ["ember", "server"]
