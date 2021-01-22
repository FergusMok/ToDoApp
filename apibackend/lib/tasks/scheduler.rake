desc "This task is called by the Heroku scheduler add-on"

task :email_users => :environment do
  puts "Sending out the emails..."
  p Item.self.index
  User.emailUsers
  puts "Done sending."
end

