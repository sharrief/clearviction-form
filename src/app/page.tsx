import Form from "@/components/Form";

export default function Home() {
  
  return (
    <main className="flex min-h-screen">
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form />
        </div>
      </div>
    </main>
  )
}
