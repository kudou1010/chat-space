json.array! @messages do |message|
  json.body message.body
  json.image message.image.url
  json.created_at message.created_at.strftime("%Y/%m/%d/(%a) %T")
  json.name message.user.name
  json.id message.id
end