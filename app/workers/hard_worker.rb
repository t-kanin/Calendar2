class HardWorker
  include Sidekiq::Worker

  def perform(*args)
    # Do something
    events = Event.all 
    # boardcast to the users before the meeting  
    #ActionCable.server.broadcast('notification_channel', 'upcomning event in 5 minutes ')
    events.each do |event|
      time_diff = ((event.start_time - Time.now)/1.minute).round
      puts("time_diff :  #{time_diff}")
      if  time_diff >= 0 && time_diff <= 5 
        body  =  "Less than 5 minute before the #{event.title} starts"
        ActionCable.server.broadcast('notification_channel', body)
      end 
    end 
    # broadcast 
  end
end
