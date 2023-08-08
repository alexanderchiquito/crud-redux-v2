import { Button, Card, Title, TextInput, BadgeDelta, } from "@tremor/react";
import { useUserActions } from './hooks/useUserActions';
import { useState } from "react";

export function CreateNewUser () {
    const { addUser } = useUserActions();
    const [result, setResult] = useState<'ok' | 'ko' | null>(null)

    const handleSubmit = (event: React.FormEvent<HTMLFormEvent>) => {
        event.preventDefault()

        setResult(null);

        const form = event.target
        const formData = new FormData(form);
        
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const github = formData.get('github') as string;

        if(!name || !email || !github){ //validaciones que tpu quieras
            return setResult('ko')
        }

        addUser({ name, email, github })
        setResult('ok')
        form.reset()
 
    }
    return (
        <Card style={{ marginTop: '16px' }}>
            <Title>Create New User</Title>
            <form onSubmit={handleSubmit} className="">
                <TextInput name="name" placeholder="Aquí Nombre" />
                <TextInput name="email" placeholder="Email" />
                <TextInput name="github" placeholder="Aquí el github" />
                <div>
                    <Button type="submit"  style={{ marginTop: '16px' }} >   
                        Crear Usuario  
                    </Button>
                    <span>
                        { result === 'ok' && <BadgeDelta deltaType="moderateIncrease" isIncreasePositive={true} size="xs" >Guardado correctamente</BadgeDelta> }
                        { result === 'ko' && <BadgeDelta color='red' size="xs" >Error en los campos</BadgeDelta> }
                    </span>
                </div>
            </form>
        </Card>
    )
}