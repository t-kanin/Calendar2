class HardWorker
  include Sidekiq::Worker

  def perform(*args)
    # Do something
    # check event.start_time < time.now - 5.minutes
    puts("start worker perfrom someting")
    events = Event.all 
    # boardcast to the users before the meeting  
    ActionCable.server.broadcast('notification_channel', 'upcomning event in 5 min utes ')
    events.each do |event|
      # puts("start: #{event.start_time}, 5 min before: #{Time.now - 5.minutes}")
      time_diff  =  (Time.now - event.start_time)/1.minute  % 60 
      puts("time_diff :  #{time_diff}")
      if  time_diff >= 0 && time_diff <= 5 
        puts(event.inspect)
        puts("start time less than time now" ) 
      end 
    end 
    # broadcast 
  end
end
