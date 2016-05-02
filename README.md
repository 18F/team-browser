[![Build Status](https://travis-ci.org/18F/team-browser.svg?branch=master)](https://travis-ci.org/18F/team-browser)
[![Code Climate](https://codeclimate.com/github/18F/team-browser/badges/gpa.svg)](https://codeclimate.com/github/18F/team-browser)
[![Test Coverage](https://codeclimate.com/github/18F/team-browser/badges/coverage.svg)](https://codeclimate.com/github/18F/team-browser)

A human-friendly web interface to the [data](https://team-api.18f.gov/public/api/) served by the [Team API Server](https://github.com/18f/team-api-server). For now the browser reads only public data.

## Serving locally

You will need [Ruby](https://www.ruby-lang.org) version 2.1.5 or greater and [Bundler](http://bundler.io/).  You'll also need to set a local environment variable `HMAC_KEY` with an HMAC key from the team-api-server.

To run your own local instance at `http://localhost:4000`:

```
$ git clone https://github.com/18F/team-browser.git
$ cd team-browser
$ cp set_hmac_auth.sample.sh set_hmac_auth.sh
$ nano set_hmac_auth.sh # or your favorite editor; set `HMAC_KEY`
$ source set_hmac_auth.sh
$ ./go serve
```

### Serving from Vagrant

As above, but also

- Add `config.vm.network "forwarded_port", guest: 4000, host: 4000` to your `Vagrantfile`
- Run with `./go serve --host 0.0.0.0`

## Contributing

1. Fork the repo (or just clone it if you're an 18F team member)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Make your changes and test them via `./go test`
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin my-new-feature`)
6. Create a new Pull Request

Feel free to [file an issue](https://github.com/18F/team-browser) or to ping the #hub channel in 18F's Slack with any questions you may have,
especially if the current documentation should've addressed your needs, but
didn't.

## Public domain

This project is in the worldwide [public domain](LICENSE.md). As stated in
[CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright
> and related rights in the work worldwide are waived through the
> [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication.
> By submitting a pull request, you are agreeing to comply with this waiver of
> copyright interest.
