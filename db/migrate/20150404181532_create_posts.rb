class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.integer :user_id
      t.text :type
      t.decimal :lat
      t.decimal :lng
      t.float :price
      t.text :desc
      t.text :pic
      t.text :info
      t.text :category

      t.timestamps null: false
    end
  end
end
