# Use this file to easily define all of your cron jobs.
#
# It's helpful, but not entirely necessary to understand cron before proceeding.
# http://en.wikipedia.org/wiki/Cron

# Example:
#
set :output, "/cron.log"
#
# every 2.hours do
#   command "/usr/bin/some_great_command"
#   runner "MyModel.some_method"
#   rake "some:great:rake:task"
# end
#
# every 4.days do
#   runner "AnotherModel.prune_old_records"
# end

#### USE THIS INSTEAD OF HEROKU SCHEDULER IF YOUR SERVER RUNS 24/7
#every 1.day, :at => '12:01 am' do 
#    runner "User.emailUsers"
#s  end
####

# Learn more: http://github.com/javan/whenever
