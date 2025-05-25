# Cinema App Mobile

A React Native mobile application for browsing movies and booking showtimes with seat selection and personal booking details.

## 📱 Features

* **Movie List**: Displays a catalog of movies from local data.
* **Movie Details**: Shows synopsis, runtime, and available showtimes.
* **Seat Selection**: Choose one or multiple seats (1–50) per booking.
* **Booking Form**: Enter your name and email to confirm tickets.
* **Order History**: View all your booked tickets with seat numbers and total cost.
* **Local Assets**: Movie posters stored in the `assets/posters` folder and loaded via `require`.
* **React Context**: Manages orders across the app using `OrdersContext`.
* **Navigation**: Native stack navigation with a persistent “My Orders” button in the header.

## 📂 Project Structure

```
cinema-app-mobile/
├── App.tsx                   # Root navigator and context provider
├── assets/
│   └── posters/              # Local movie poster images
├── src/
│   ├── contexts/
│   │   └── OrdersContext.tsx # React Context for order management
│   ├── data/
│   │   └── movies.ts         # Movie definitions and poster imports
│   └── screens/
│       ├── HomeScreen.tsx    # Movie list view
│       ├── DetailsScreen.tsx # Movie detail & showtimes
│       ├── CheckoutScreen.tsx# Seat selection & booking form
│       └── MyOrdersScreen.tsx# List of past bookings
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites

* **Node.js** (>=14.x)
* **npm** or **Yarn**
* **Expo CLI** (optional, via `npm install -g expo-cli`)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/purpleFade/cinema-app-mobile.git
   cd cinema-app-mobile
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the app**

   ```bash
   npx expo start
   ```

4. **Launch**

   * Scan the QR code with Expo Go on your phone
   * Or press `i` to open in iOS Simulator / `a` for Android emulator

## 🛠 Usage

* **Home Screen**: Tap a movie card to view details.
* **Details Screen**: Scroll for synopsis and available showtimes.
* **Booking**: Tap one or more showtime buttons, select seats, then enter name & email and tap **Confirm**.
* **My Orders**: Access via the header button on any screen to review your bookings.

## 🎨 Customization

* **Movie Data**: Edit `src/data/movies.ts` to add or remove movies.
* **Seat Price**: Adjust the `SEAT_PRICE` constant in `src/screens/CheckoutScreen.tsx`.
* **Number of Seats**: Modify the `SEATS` array generation in `CheckoutScreen.tsx`.
* **Styling**: Change styles in each screen’s `StyleSheet`.

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/NewFeature`)
3. Commit your changes (`git commit -m "Add new feature"`)
4. Push to your branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

## 📄 License

This project is open source under the **MIT License**. Feel free to use and modify as needed.
