class UserMailer < ApplicationMailer
  default from: 
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.due_date_chaser.subject
  #
  def due_date_chaser(user)
    @user = user
    # Checks if the time difference in days is between 0 and 1.
    
    # Toggle the 0..0 range if you want to change. 0..0 is 24 hours, 0..1 is 48 hours....
    @items = Item.where(user_id: @user.id).where(completed: false).where.not(due_date: nil).select {|v| (0..0).include?((DateTime.parse(v.due_date) - DateTime.current()).to_i) }
    @url  = 'https://fergus-cvwo.netlify.app/'
    if @items != []
      mail(to: @user.email, subject: 'You have tasks due in 24 hours!')
    end
  end
end
