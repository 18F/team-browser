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

require 'jekyll-assets'
require 'date'

module Hub

  # Contains Hub-specific Liquid filters.
  module Filters

    def img_file_path(name, site)
      File.join(site['team_img_dir'], "#{name}.jpg")
    end

    def photo_exists(member, site)
      keys = site['img_name_keys'] || ['name']
      if member.kind_of?(String)
        member = {"name"=> member}
      end
      keys.each do |key|
        name = member[key]
        if photo_exists_in(name, site) || photo_exists_at(name, site)
          return true
        end
      end
      return false
    end

    def photo_exists_in(name, site)
      File.exists? img_file_path(name, site)
    end

    def photo_exists_at(name,site)
      if !site['photo_repository_url']
        return false
      else
        uri = URI("#{site['photo_repository_url']}#{name}.jpg")
        res = Net::HTTP.get_response(uri)
        return res.code == "200"
      end
    end

    # URL of team member's photo, or to the substitute image
    # when their photo is missing
    # member is the team member object
    # creates an object if just a name string is passed
    def photo_or_placeholder(member, site)
      base = site['baseurl'] || ''
      keys = site['img_name_keys'] || ['name']
      if member.kind_of?(String)
        member = {"name"=> member}
      end
      keys.each do |key|
        name = member[key]
        if photo_exists_in(name, site)
          return File.join(base, img_file_path(name, site))
        end
        if photo_exists_at(name, site)
          return "#{site['photo_repository_url']}#{name}.jpg"
        end
      end
      File.join(base, site['team_img_dir'], site['missing_team_member_img'])
    end

    # Checks to see whether a given date is prior to today
    def before_today(datestring)
      if (datestring != nil)
        if (DateTime.parse(datestring) < Date.today)
          return true
        else
          return false
        end
      else
        return false
      end
    end

    # Checks to see whether a given date is after today
    def after_today(datestring)
      if (datestring != nil)
        if (DateTime.parse(datestring) > Date.today)
          return true
        else
          return false
        end
      else
        return false
      end
    end

    # Returns a canonicalized, URL-friendly substitute for an arbitrary string.
    # +s+:: string to canonicalize
    def canonicalize(s)
      Canonicalizer.canonicalize s
    end

    # Because checking class types in Jekyll does not seem to work,
    # we need a filter that returns it
    def class_name(data)
      data.class.name
    end
  end
end

Liquid::Template.register_filter(Hub::Filters)
