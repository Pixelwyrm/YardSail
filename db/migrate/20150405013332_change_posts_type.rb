class ChangePostsType < ActiveRecord::Migration
  def change
  	remove_column :posts, :type
  	add_column :posts, :action, :text
  end
end
