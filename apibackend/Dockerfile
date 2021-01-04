FROM ruby:2.7.2
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /myapp
WORKDIR /myapp
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock
RUN gem install bundler -v 2.1.4
RUN bundle install
COPY . /myapp

CMD ["rails", "server", "-b", "0.0.0.0"]