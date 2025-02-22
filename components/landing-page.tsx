import { CheckSquare, ListTodo, UserPlus } from "lucide-react";
import { Button } from "./ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export function LandingPageContent() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Collaborate on Tasks with GroupTodo
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Create or join groups, manage tasks together, and boost your
                team&apos;s productivity with our intuitive group todo app.
              </p>
            </div>
            <div className="space-x-4">
              <SignUpButton mode="modal">
                <Button className="cursor-pointer">Get Started</Button>
              </SignUpButton>
              <Button variant="outline">Learn More</Button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            Key Features
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <UserPlus className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-lg font-bold">Create or Join Groups</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Easily create new groups or join existing ones to collaborate
                with your team.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <ListTodo className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-lg font-bold">Add Tasks and Subtasks</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Break down your projects into manageable tasks and subtasks for
                better organization.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <CheckSquare className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-lg font-bold">Individual Task Completion</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Each group member can mark their own tasks as complete,
                promoting accountability.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to boost your team&apos;s productivity?
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Join GroupTodo today and experience seamless collaboration on
                your projects.
              </p>
            </div>
            <div className="space-x-4">
              <SignUpButton mode="modal">
                <Button className="cursor-pointer" size="lg">Sign Up Now</Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button className="cursor-pointer" size="lg" variant="outline">
                  Take a Tour
                </Button>
              </SignInButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
