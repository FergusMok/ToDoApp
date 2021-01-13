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
    @items = Item.where(user_id: @user.id).where.not(due_date: nil).select {|v| (0..1).include?((DateTime.parse(v.due_date) - DateTime.current()).to_i) }
    @url  = 'https://fergus-cvwo.netlify.app/'
    if @items != []
      mail(to: @user.email, subject: 'You have tasks due in 24 hours!')
    end
  end
end
