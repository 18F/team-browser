# 18F Hub - Docs & connections between team members, projects, and skill sets
#
# Written in 2014 by Mike Bland (michael.bland@gsa.gov)
# on behalf of the 18F team, part of the US General Services Administration:
# https://18f.gsa.gov/
#
# To the extent possible under law, the author(s) have dedicated all copyright
# and related and neighboring rights to this software to the public domain
# worldwide. This software is distributed without any warranty.
#
# You should have received a copy of the CC0 Public Domain Dedication along
# with this software. If not, see
# <https://creativecommons.org/publicdomain/zero/1.0/>.
#
# @author Mike Bland (michael.bland@gsa.gov)

# Jekyll plugins for the 18F Hub (https://hub.18f.us)
#
# The Hub::Generator class contains the logic for all Hub-specific data
# processing and page generation.

require 'hash-joiner'
require 'team_hub'

module Hub

  # Processes site data, generates authorization artifacts, publishes an API,
  # and generates cross-linked Hub pages.
  class Generator < ::Jekyll::Generator
    safe true

    # jekyll_get pulls data from team_api, but it's nested
    def unnest_site_api_data(site)
      site.data.keys.each do |data_type|
        if data_type.end_with? '_raw'
          site.data[data_type[0..-5]] = site.data[data_type]['results']
          site.data.delete data_type
        end
      end
    end

    # Executes all of the data processing and artifact/page generation phases
    # for the Hub.
    def generate(site)
      unnest_site_api_data(site)
      site.data['guest_users'] = []

      Joiner.join_data(site)
      # Auth.generate_artifacts(site)
      Team.generate_pages(site)
      WorkingGroups.generate_pages(site)
      Stats.assign_stats(site)
    end
  end
end
