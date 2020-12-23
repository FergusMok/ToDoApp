class AddCompletedToItems < ActiveRecord::Migration[6.0]
  def change
    add_column :items, :completed, :boolean
  end
end
