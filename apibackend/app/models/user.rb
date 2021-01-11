class User < ApplicationRecord
    has_secure_password
    has_many :items

    validates :password, presence: true
    validates :name, presence: true
    validates :email, presence: true, uniqueness: true, case_sensitive: false, format: URI::MailTo::EMAIL_REGEXP
end
