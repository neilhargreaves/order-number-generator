using System;
using System.Collections.Generic;
using System.Linq;

namespace OrderNumberGenerator
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine(OrderNumberGenerator.SimpleGenerateOrderNumber());
            Console.WriteLine(OrderNumberGenerator.SimpleGenerateOrderNumber());
            Console.ReadLine();
        }
    }

    class OrderNumberGenerator
    {
        private static Random random = new Random();

        const string allowedCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";       
        const int bitsInLong = 64;
        const int radix = 36;

        public static string GenerateOrderNumber()
        {
            var guid = new Guid();
            var byteArray = guid.ToByteArray();
            var aggregateByteArray = AggregateByteArray(byteArray);
            var encodeOrderNumber = EncodeOrderNumber(aggregateByteArray);


            throw new NotImplementedException();
        }

        public static string SimpleGenerateOrderNumber()
        {
            var numbers = new List<int>() { 4, 4, 4, 1 };
            var parts = new List<string>();

            foreach (int number in numbers)
            {
                parts.Add(RandomCharacterString(number));
            }

            return parts.Aggregate((agg, part) => $"{agg}-{part}");
        }

        private static string RandomCharacterString(int charcterCount = 4)
        {
            return new string(Enumerable.Repeat(allowedCharacters, charcterCount)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        private static long AggregateByteArray(Byte[] byteArray)
        {
            return byteArray.Aggregate((agg, value) => agg += value);
        }

        private static string EncodeOrderNumber(long orderNumber)
        {
            var ms = DateTime.Now.Millisecond;
            return Math.Abs(orderNumber -= ms).ToString();
        }

        private static string numberToRandomString(long number)
        {
            var index = bitsInLong - 1;
            var charArray = new char[];
        }
    }
}
