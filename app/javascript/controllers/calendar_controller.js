import { Controller} from "stimulus"
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list' 
import interactionPlugin from '@fullcalendar/interaction'
import Rails from '@rails/ujs'
import Turbolinks from "turbolinks"

export default class extends Controller {
    static targets = [ "calendar","modal", "start_time", "end_time"]
    
    connect(){
      const calendarTarget = this.calendarTarget
      const modalTarget = this.modalTarget
      let _this = this

      //Function for creating the calendar from the fullcalendar framework
      let calendar = new Calendar(calendarTarget, {
        // get events from the url http://127.0.0.1:3000/events.json
        // However the events will not display yet because the format in events.json does not match the fullcalendar framework
        // 'start_time' and 'end_time' need to be renamed to 'start' and 'end'
        timeZone: 'UTC',
        events: '/events.json', 
        editable: true,
        plugins: [dayGridPlugin, timeGridPlugin,listPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {left: 'dayGridMonth,timeGridWeek,timeGridDay', center: 'title'} ,
        navLinks: true, 

        // function for modal pop-up  when click the date 
        navLinkDayClick: function(date, jsEvent) {
          modalTarget.setAttribute("style","display: block;")
          _this.start_timeTarget.value = date 
          _this.end_timeTarget.value = date
        },

        eventClick: function(info){
          info.jsEvent.preventDefault() //dont let the browser naviate which leads to json url 
          Turbolinks.visit(info.event.extendedProps.show_url)
        },

        // drag and drop event on calendar
        eventDrop: function(info){
          let data = _this.data(info)
          //console.log(info.event.url) -> http://127.0.0.1:3000/events/5.json
          console.log(new URLSearchParams(data).toString)
          Rails.ajax({
            type: 'PATCH',
            url: info.event.url, 
            data: new URLSearchParams(data).toString,
          })
        },

        // resize the event on calendar 
        eventResize: function(info){
          let data = _this.data(info)
          let mydata = {
            "event":{
              start_time: info.event.start, 
              end_time: info.event.start 
            }
          }

          console.log(mydata)
          //events/5.json?start=2021-06-27T00%3A00%3A00%2B07%3A00&end=2021-08-08T00%3A00%3A00%2B07%3A00
          Rails.ajax({
            type: 'PUT',
            url: 'events/13',//info.event.url,
            contentType: 'application/json',
            data:{
              "event":{
                start_time: info.event.start, 
                end_time: info.event.start 
              }
            },//JSON.stringify(data)}, //  {"event": data},   //new URLSearchParams(data).toString 
          })
        },

      })

      //rendering the calendar to the view
      calendar.render()
    }


    // create parameters that can be POST back using rails/ujs
    data(info){
      return{
        "event[start_time]": info.event.start,
        "event[end_time]": info.event.end,
      }
    }
}