class Event < ApplicationRecord
    belongs_to :user

    #after_save_commit do 
    #    ReminderJob.set(wait_until: Time.now).perform_later(self)
    #end 

end
