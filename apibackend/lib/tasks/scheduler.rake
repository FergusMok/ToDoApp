desc "This task is called by the Heroku scheduler add-on"

task :email_users => :environment do
  puts "Sending out the emails..."
  User.find_each do |user|
    UserMailer.due_date_chaser(user).deliver_now
  end
  puts "Done sending."
end

