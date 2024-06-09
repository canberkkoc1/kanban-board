# Kanban Board Project

This project is a Kanban Board application built using Next.js, React Beautiful DnD, and MongoDB. Users can drag and drop tasks, create new tasks, and manage tasks.

## Features

- Drag and drop tasks using React Beautiful DnD
- Data storage with MongoDB
- Server Actions
- Server-side rendering (SSR) and client-side rendering (CSR) with Next.js
- Styling with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/canberkkoc1/kanban-board.git
    cd kanban-board
    ```

2. Install the necessary packages:

    ```bash
    npm install
    ```

3. Create a `.env.local` file and add your MongoDB connection string:

    ```bash
    touch .env.local
    ```

    Add the following line to the `.env.local` file:

    ```
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/kanban?retryWrites=true&w=majority
    ```

4. Start the application:

    ```bash
    npm run dev
    ```

    You can view the application at [http://localhost:3000](http://localhost:3000).

## Usage

- Click the "Create a new board" button to create tasks.
- Drag and drop tasks between different columns.
- Click on task cards to view and edit task details.

## Project Structure

- `components/`: React components
- `pages/`: Next.js pages
- `lib/`: MongoDB connection and data management
- `styles/`: Tailwind CSS styles

## Contributing

1. Fork this repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.

## Contact

If you have any questions or suggestions about this project, please contact me at [email@example.com](mailto:email@example.com).

---

Using this project, you can easily develop and customize your application. Happy coding!
