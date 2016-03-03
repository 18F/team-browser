sudo gem install bundler
cd /team-browser
bundle install
source /team-browser/set_hmac_auth.sh
/team-browser/go serve --host 0.0.0.0

