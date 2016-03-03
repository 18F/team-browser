To run from Vagrant:

1. In the top-level directory , `cp set_hmac_auth.sample.sh set_hmac_auth.sh` and edit it with an actual `HMAC_KEY`
2. `cd vagrant`
3. `vagrant up`
4. `vagrant ssh`
5. `cd /team-browser`
6. `./initial_setup.sh`
7. `./run.sh`

On subsequent runs, omit `./initial_setup.sh`.
