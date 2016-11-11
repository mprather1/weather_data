require 'json'
require 'faker'
@date_counter = 0

# Create Users seed
File.open('seeds/entries.json', 'w') do |file|
file.puts('[')  
365.times do
  @temperatureLow = Faker::Number.number(2)
  @temperatureHi = @temperatureLow.to_i + (Faker::Number.number(1).to_i*3)
  @dew_point = Faker::Number.number(2)
  @humidity = Faker::Number.number(2)
  @date = Date.today + @date_counter
  @date_counter += 1
  
  my_hash = {
    temperature_low: @temperatureLow.to_i,
    temperature_hi: @temperatureHi.to_i,
    dew_point: @dew_point.to_i,
    humidity: @humidity.to_i,
    dates: @date
  }
  file.puts(JSON.generate(my_hash) + ",")
end
file.puts("]")
end