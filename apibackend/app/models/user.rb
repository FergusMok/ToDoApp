class User < ApplicationRecord
    has_secure_password

    validates_format_of :email, :with => URI::MailTo::EMAIL_REGEXP
    validates_presence_of :email
    validates_uniqueness_of :email
end
