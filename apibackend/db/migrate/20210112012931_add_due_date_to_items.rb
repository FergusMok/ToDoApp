class AddDueDateToItems < ActiveRecord::Migration[6.0]
  def change
    add_column :items, :due_date, :string
  end
end
