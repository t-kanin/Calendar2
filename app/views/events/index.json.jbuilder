# go through array of events and reder partial
json.array! @events, partial: "events/event", as: :event

