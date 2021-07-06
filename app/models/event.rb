class Event < ApplicationRecord
    belongs_to :user
    validate :end_date_before_start_date? 

    def end_date_before_start_date?
        errors.add(:end_time, "cannot come before start date") if self.end_time < self.start_time
    end

    
    # handle for creating csv file
    def self.to_csv
        attributes = %w{title start_time end_time}
        CSV.generate(headers: true) do |csv|
            csv << attributes
            all.each do |event|
                csv << attributes.map {|attr| event.send(attr)}
            end 
        end 
    end 

end
