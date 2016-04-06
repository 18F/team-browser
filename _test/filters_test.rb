require_relative "test_helper"
require_relative "../_plugins/filters"

require "minitest/autorun"
require "date"

module Hub
  class TestFilters
    include Filters
  end

  class DateCompareFilterTest < ::Minitest::Test
    include Filters

    @@sample_date_before_today = (Date.today - 1).to_s
    @@sample_date_after_today = (Date.today + 1).to_s

    def test_is_before_today
      is_before_today = before_today(@@sample_date_before_today)

      assert_equal(true, is_before_today)
    end

    def test_is_after_today
      is_after_today = after_today(@@sample_date_after_today)

      assert_equal(true, is_after_today)
    end

    def test_is_not_after_today
      is_after_today = after_today(@@sample_date_before_today)

      assert_equal(false, is_after_today)
    end

    def test_is_not_before_today
      is_before_today = before_today(@@sample_date_after_today)

      assert_equal(false, is_before_today)
    end

    def test_is_nil_before
      is_before_today = before_today(nil)

      assert_equal(false, is_before_today)
    end

    def test_is_nil_after
      is_after_today = after_today(nil)

      assert_equal(false, is_after_today)
    end

  end

  class PhotoOrPlaceholderFilterTest < ::Minitest::Test
    include Filters

    @@sample_team_member_name = 'sample.teammember'
    @@image_directory_name = File.join("_test", "tmp_images")
    @@imagefile_path = File.join(@@image_directory_name, "#{@@sample_team_member_name}.jpg")
    @@site = {'team_img_dir' => @@image_directory_name,
      'missing_team_member_img' => 'no_image.jpg'}

    def setup
      img_file = File.new(@@imagefile_path, 'wb')
      img_file.close
    end

    def teardown
      File.delete(@@imagefile_path)
    end

    def test_when_photo_present
      result = photo_or_placeholder(@@sample_team_member_name, @@site)
      photo_exists = photo_exists(@@sample_team_member_name, @@site)
      
      assert_equal(true, photo_exists)
      assert_equal(File.join("", @@imagefile_path), result)
    end

    def test_when_photo_absent
      result = photo_or_placeholder("nonexistent", @@site)
      photo_exists = photo_exists("nonexistent", @@site)
      
      assert_equal(false, photo_exists)
      assert_equal(File.join("", @@image_directory_name, "no_image.jpg"), result)
    end

  end
end
