class Item < ApplicationRecord
    validates :title, presence: true, length: {minimum: 3, maximum: 30}
    validates :body, presence: true, length: {minimum: 5, maximum: 1000} 
end
