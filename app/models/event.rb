class Event < ApplicationRecord
    belongs_to :user
    validate :end_date_before_start_date? 

    def end_date_before_start_date?
        errors.add(:end_time, "cannot come before start date") if self.end_time < self.start_time
    end

end
