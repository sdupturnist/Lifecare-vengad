// hooks/useData.js

import { wordpressGraphQlApiUrl } from '@/utils/variables';
import { useEffect, useState } from 'react';

export const HeaderData = (initialData) => {
    const [dataHeader, setDataHeader] = useState(initialData);
    const [errorHeader, setErrorHeader] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await fetch( wordpressGraphQlApiUrl, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      query: ` query Posts {
                        mediaItems(where: {name: "site-logo"}) {
                          nodes {
                            altText
                            sourceUrl
                          }
                        }
                      }
                        `,
                    }),
                    next: { revalidate: 10 },
                  },
                    {
                      cache: 'force-cache',
                      cache: 'no-store'
                    });
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await res.json();

                
                setDataHeader(data);
                //console.log(data)
            } catch (error) {
              setErrorHeader(error.message);
            }
        };

        if (!initialData) {
            fetchData();
        }
    }, [initialData]);

    return { dataHeader, errorHeader };
};
