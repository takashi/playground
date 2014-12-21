class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :name
      t.string :job
      t.integer :life

      t.timestamps
    end
  end
end
