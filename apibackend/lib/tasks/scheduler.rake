desc "This task is called by the Heroku scheduler add-on"

task :email_users => :environment do
  puts "Sending out the emails..."
  User.emailUsers
  puts "Done sending."
end

