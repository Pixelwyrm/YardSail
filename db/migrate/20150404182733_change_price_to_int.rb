class ChangePriceToInt < ActiveRecord::Migration
	def change
		remove_column :posts, :price
		add_column :posts, :price, :integer
	end
end
