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

require 'team_hub/page'

module Hub
  class Team
    def self.generate_pages(site)
      self.check_data_quality(site)
      ::TeamHub::Page.generate_collection_item_pages(site, 'team',
        'team_member', 'full_name', primary_key: 'name')
      team = site.data['team'] || []
    end

    def self.check_data_quality(site)
      # Liquid errors are very cryptic, so let's pre-check for
      # some common data problems
      %w(locations skills interests projects).each do |k|
        raise "No data collected for #{k}" if site.data[k].nil?
      end
      raise "Bad location data" unless site.data['locations'].all? { |itm| itm.has_key? 'label' }
      raise "Bad skills data" unless site.data['skills'].all? { |itm| itm.has_key? 'name' }
      raise "Bad interests data" unless site.data['interests'].all? { |itm| itm.has_key? 'name' }
      raise "Bad projects data" unless site.data['projects'].all? { |itm| itm.has_key? 'name' }
    end
  end
end
