# Linkly - Your Powerful Link Shortener

Linkly is a user-friendly, feature-rich link shortener app designed to simplify and enhance your URL management experience. With Linkly, you can easily generate short, shareable links and customize them to suit your needs.

---

## Features

- **Shorten Long URLs**: Instantly create compact, shareable links for long and complex URLs.
- **Customizable URLs**: Add a personal touch by customizing the alias of your shortened links.
- **Mobile-Friendly Design**: Fully responsive interface, accessible on all devices.

---

## Installation Instructions

Follow these steps to install and run Linkly:

### Prerequisites
- **Node.js** (v14.0.0 or higher)
- **npm** package manager
- A MongoDB instance (local or cloud-based)

### Steps to Install

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/username/linkly.git
   cd linkly
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the root directory and add the following:
     ```
     MONGO_URI=<your-mongodb-connection-string>
     NEXT_PUBLIC_HOST=https:localhost:3000
     ```

4. **Run the Application**:
   - Development Mode:
     ```bash
     npm run dev
     ```
   - Production Mode:
     ```bash
     npm run start
     ```

5. **Access the App**:
   - Open your browser and navigate to `http://localhost:3000`.

---

## Usage

**Shorten a URL**:
   - Enter the long URL in the input field and click **Shorten**.
   - Copy and share your new shortened link.

## Contributing

We welcome contributions from the community! To contribute:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/new-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/new-feature
   ```
5. Submit a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For support or inquiries, feel free to reach out:

- **Github**: [Linkly](https://github.com/ShadowProtocol1/Linkly) 
